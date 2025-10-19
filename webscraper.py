
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
    #get bill information
    db_product = defaultdict(list)
    target_td_ids = ['cellLastAction', 'cellCaptionText', 'cellAuthors', 'cellSponsors', 'cellSubjects']
    for bill, link in bills_dict.items():
        b_page_content = get_website(link)
        history_soup = BeautifulSoup(b_page_content, 'html.parser')
        print(f"Processing {bill}...")
        for td_id in target_td_ids:
            td = history_soup.find('td', id=td_id)
            #print(td_id, "|", td.text.strip(), "\n" )
            if td_id == 'cellCaptionText' or td_id == 'cellLastAction':
                db_product[bill].append(td.text.strip())
            else:
                db_product[bill].append(re.split(r"[|,)]", td.text.strip()))

        print(db_product[bill]) ###needs to connect to a database

def get_website(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to retrieve website: {url}")


def smooth_data(big_dict):
    #format bill data
    bill_data = {}
    for bill, details in big_dict.items():
        caption = details[1]
        bill_data[bill] = {
            'caption': caption,
        }

    #format legislator data
    house_mem_pg = 'https://capitol.texas.gov/members/members.aspx?Chamber=H'
    sentate_mem_pg = 'https://capitol.texas.gov/Members/Members.aspx?Chamber=S'

    house_legislators = get_legislator_info(house_mem_pg)
    senate_legislators = get_legislator_info(sentate_mem_pg)

    legislators = {} #name : chamber
    for name in house_legislators:
        legislators[name] = 'House'
    for name in senate_legislators:
        legislators[name] = 'Senate'


def get_legislator_info(url):
    html_content = get_website(url)
    soup = BeautifulSoup(html_content, 'html.parser')
    tables = soup.find_all("table", id="dataListMembers")

    legislators = []
    for table in tables:
        member_tag = table.find_all('a')
        for tag in member_tag:
            name = tag.text.strip()
            legislators.append(name)
        return None

main()
