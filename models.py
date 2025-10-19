
from extensions import db


class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # DB column renamed to `caption` (now TEXT to allow long captions)
    caption = db.Column(db.Text, nullable=False)
    # bill_name stores the short identifier (e.g. 'HB123')
    bill_name = db.Column(db.String(64), nullable=False, unique=True)


class Legislator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)


class BillLegislatorRole(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bill.id'))
    legislator_id = db.Column(db.Integer, db.ForeignKey('legislator.id'))
    role = db.Column(db.String(100))


class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)


class BillSubject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bill.id'))
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'))

