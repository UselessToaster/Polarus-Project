# load_scraped_data.py
from app import app, db
from models import Bill, Legislator, BillLegislatorRole, Subject, BillSubject


def insert_scraped_data(scraped_data):
    """
    Accepts scraped_data in the form:
      { bill_name: [caption, [authors], [sponsors], [keywords]] }

    bill_name is a string identifier (e.g. 'HB123').
    caption is the full caption text for the bill.
    authors/sponsors are lists of legislator name strings.
    keywords is a list of subject/keyword strings.
    """

    for bill_name, data in scraped_data.items():
        # New format: caption, authors, sponsors, keywords
        try:
            caption, authors, sponsors, keywords = data
        except ValueError:
            raise ValueError(
                "Each scraped_data value must be [caption, [authors], [sponsors], [keywords]]"
            )

        # Normalize inputs
        caption = caption or ""
        authors = authors or []
        sponsors = sponsors or []
        keywords = keywords or []

        # strip whitespace from names/keywords
        authors = [a.strip() for a in authors if a and a.strip()]
        sponsors = [s.strip() for s in sponsors if s and s.strip()]
        keywords = [k.strip() for k in keywords if k and k.strip()]

        # Wrap each bill in its own transaction so failures don't stop the whole run
        try:
            # 1️⃣ Create or update the Bill
            # Try to find an existing bill by the short bill_name identifier
            bill = db.session.query(Bill).filter(Bill.bill_name == bill_name).first()
            if not bill:
                # use caption when available, otherwise fall back to bill_name
                bill_title = caption if caption else bill_name
                bill = Bill(caption=bill_title, bill_name=bill_name)
                db.session.add(bill)
                db.session.flush()  # ensure bill.id is available

            # 2️⃣ Add legislators (authors & sponsors)
            def handle_legislators(names, role_type):
                for name in names:
                    legislator = db.session.query(Legislator).filter_by(name=name).first()
                    if not legislator:
                        legislator = Legislator(name=name)
                        db.session.add(legislator)
                        db.session.flush()

                    # avoid duplicate role rows for the same bill/legislator/role
                    exists = db.session.query(BillLegislatorRole).filter_by(
                        bill_id=bill.id,
                        legislator_id=legislator.id,
                        role=role_type
                    ).first()
                    if not exists:
                        role = BillLegislatorRole(
                            bill_id=bill.id,
                            legislator_id=legislator.id,
                            role=role_type
                        )
                        db.session.add(role)

            handle_legislators(authors, "Author")
            handle_legislators(sponsors, "Sponsor")

            # 3️⃣ Add subjects (keywords)
            for keyword in keywords:
                subject = db.session.query(Subject).filter_by(name=keyword).first()
                if not subject:
                    subject = Subject(name=keyword)
                    db.session.add(subject)
                    db.session.flush()

                # avoid duplicate bill_subject rows
                exists_bs = db.session.query(BillSubject).filter_by(
                    bill_id=bill.id,
                    subject_id=subject.id
                ).first()
                if not exists_bs:
                    bill_subject = BillSubject(
                        bill_id=bill.id,
                        subject_id=subject.id
                    )
                    db.session.add(bill_subject)

            # commit per-bill
            db.session.commit()
            print(f"✅ Inserted bill: {bill_name} (id={bill.id})")

        except Exception as e:
            # rollback this bill's partial work and continue
            db.session.rollback()
            print(f"❌ Failed to insert bill {bill_name}: {e}")

    print("✅ Finished insert_scraped_data run")


# Example usage (small smoke test when run as script)
if __name__ == "__main__":
    sample_data = {
        "HB123": [
            "Relating to education funding and teacher pay",
            ["Rep. Alice Johnson", "Rep. Bob Smith"],
            ["Sen. Maria Lopez"],
            ["education", "funding", "teachers"]
        ]
    }

    with app.app_context():
        insert_scraped_data(sample_data)
