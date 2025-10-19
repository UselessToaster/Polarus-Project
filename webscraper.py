import requests
from bs4 import BeautifulSoup
from collections import defaultdict
import re

#get website content
def main():
    passed_bills_pg = "https://capitol.texas.gov/Reports/Report.aspx?LegSess=892&ID=passed" 
    html_content = get_website(passed_bills_pg)

   #print("website gud")
    if not html_content:
        return 
    
    soup = BeautifulSoup(html_content, 'html.parser')

    #get list of relevant bills
    tables = soup.find_all("table")

    #get bill number and link to bill page
    bills_dict = {}
    for table in tables:
        link_tag = table.find("a") #finds first a in table
        if link_tag and ('HB' in link_tag.text or 'SB' in link_tag.text):
            bill_link = link_tag['href']
            bill_number = link_tag.text.strip()
            bills_dict[bill_number] = bill_link #creates dictionary comprised of bill number and link
            #print(f"Bill Number: {bill_number}, Link: {bill_link}")

    print(f"Total Bills Found: {len(bills_dict)}")
    # get bill information
    db_product = defaultdict(list)
    target_td_ids = ['cellLastAction', 'cellCaptionText', 'cellAuthors', 'cellSponsors', 'cellSubjects']
    for bill, link in bills_dict.items():
        b_page_content = get_website(link)
        history_soup = BeautifulSoup(b_page_content, 'html.parser')
        print(f"Processing {bill}...")
        for td_id in target_td_ids:
            td = history_soup.find('td', id=td_id)
            text = td.text.strip() if td and td.text else ''
            #print(td_id, "|", text, "\n" )
            if td_id in ('cellCaptionText', 'cellLastAction'):
                db_product[bill].append(text)
            else:
                db_product[bill].append(re.split(r"[|,)]", text))

        print(db_product[bill])  # needs to connect to a database

    # debug: how many bill entries collected into db_product
    print(f"Collected db_product entries: {len(db_product)}")
    for k, v in db_product.items():
        print(f" - {k}: fields={len(v)}")

    # Transform db_product into the expected scraped_data format used by insert_scraped_data
    # expected now: { bill_name: [caption_str, [authors_list], [sponsors_list], [keywords_list]] }

    def clean_list(items):
        return [s.strip() for s in items if s and s.strip()]

    scraped_data = {}
    for bill, vals in db_product.items():
        # vals layout from target_td_ids: [lastAction, caption, authors, sponsors, subjects]
        last_action = vals[0] if len(vals) > 0 else ""
        caption = vals[1] if len(vals) > 1 else ""
        raw_authors = vals[2] if len(vals) > 2 else []
        raw_sponsors = vals[3] if len(vals) > 3 else []
        raw_subjects = vals[4] if len(vals) > 4 else []

        authors = clean_list(raw_authors)
        sponsors = clean_list(raw_sponsors)
        keywords = clean_list(raw_subjects)

        # Keep full caption (DB column is TEXT)
        caption_clean = caption or ""

        # Store as: caption, authors, sponsors, keywords
        scraped_data[bill] = [caption_clean, authors, sponsors, keywords]

    # If load_scraped_data.insert_scraped_data is available, call it to insert into DB
    try:
        from load_scraped_data import insert_scraped_data
        from app import app

        # dump scraped_data to a temp file for inspection
        try:
            import json
            with open('/tmp/scraped_data.json', 'w', encoding='utf-8') as f:
                json.dump(scraped_data, f, ensure_ascii=False, indent=2)
            print(f"Wrote /tmp/scraped_data.json with {len(scraped_data)} items")
        except Exception as e:
            print('Could not write scraped_data to file:', e)

        print(f"About to insert {len(scraped_data)} bills into DB")
        with app.app_context():
            insert_scraped_data(scraped_data)
            print("✅ Scraped data inserted via insert_scraped_data")
    except Exception as e:
        print("Could not insert scraped data via insert_scraped_data:", e)

def get_website(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to retrieve website: {url}")
    return None


def smooth_data(big_dict):
    # format bill data
    bill_data = {}
    for bill, details in big_dict.items():
        caption = details[1] if len(details) > 1 else ''
        bill_data[bill] = {
            'caption': caption,
        }

    # format legislator data (not used yet by insert)
    house_mem_pg = 'https://capitol.texas.gov/members/members.aspx?Chamber=H'
    senate_mem_pg = 'https://capitol.texas.gov/Members/Members.aspx?Chamber=S'

    house_legislators = get_legislator_info(house_mem_pg)
    senate_legislators = get_legislator_info(senate_mem_pg)

    legislators = {}  # name : chamber
    for name in (house_legislators or []):
        legislators[name] = 'House'
    for name in (senate_legislators or []):
        legislators[name] = 'Senate'

    return bill_data, legislators


def get_legislator_info(url):
    html_content = get_website(url)
    if not html_content:
        return []
    soup = BeautifulSoup(html_content, 'html.parser')
    tables = soup.find_all("table", id="dataListMembers")

    legislators = []
    for table in tables:
        member_tag = table.find_all('a')
        for tag in member_tag:
            name = tag.text.strip()
            legislators.append(name)
    return legislators
 

if __name__ == "__main__":
    main()

