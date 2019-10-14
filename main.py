import os
from datetime import datetime
from jinja2 import Environment, PackageLoader
from markdown2 import markdown
import instaloader
from instaloader import Profile
import shutil
from itertools import islice 
import sys
import json

# Get Data from React App
with open("client/public/data.json") as f:
    data = json.loads(f.read())


# Get Key Info from the Data
emailID = data["email"]
INSTAUSERNAME = data["url"]
about = data["aboutUs"]
phoneNo = data["mobile"]
address = "Computing Drive, NUS"
emailDisp = data["email"]

def main():
    ## Get Insta Posts
    POST_COUNTER = 1
    Instagram = instaloader.Instaloader(save_metadata=False, download_comments=False, post_metadata_txt_pattern="")
    profile = Profile.from_username(Instagram.context, INSTAUSERNAME) 

    posts = sorted(profile.get_posts(), key = lambda p: p.likes + p.comments)
    for post in islice(posts, 0, 6):
        Instagram.download_post(post, "output")

    # put into right folder
    abs_path = os.path.abspath(os.path.dirname(__file__))
    sourcepath=os.path.join(abs_path, 'output/')
    dest=os.path.join(abs_path, 'output/img/')
    files = os.listdir(sourcepath)

    for f in files:
        if f.endswith(".jpg"):
            shutil.move(sourcepath+f, dest+ str(POST_COUNTER) + ".jpg")
            POST_COUNTER += 1

    ## Generate HTML
    POSTS = {}

    for markdown_post in os.listdir('content'):
        if markdown_post.endswith(".md"):
            file_path = os.path.join('content', markdown_post)
            with open(file_path, 'r') as file:
                POSTS[markdown_post] = markdown(file.read(), extras=['metadata'])

    env = Environment(loader=PackageLoader('main', 'templates'))
    home_template = env.get_template('home.html')
    post_template = env.get_template('post.html')
    about_template = env.get_template('about.html')
    contact_template = env.get_template('contact.html')

    posts_metadata = [POSTS[post].metadata for post in POSTS]
    tags = [post['tags'] for post in posts_metadata]
    home_html = home_template.render(title=INSTAUSERNAME)
    about_html = about_template.render(title=INSTAUSERNAME, about=about)
    contact_html = contact_template.render(title=INSTAUSERNAME, email=emailID, phone=phoneNo, address=address)

    with open('output/home.html', 'w') as file:
        file.write(home_html)

    with open('output/about.html', 'w') as file:
        file.write(about_html)

    with open('output/contact.html', 'w') as file:
        file.write(contact_html)

    for post in POSTS:
        post_metadata = POSTS[post].metadata

        post_data = {
            'content': POSTS[post],
            'title': post_metadata['title'],
            'date': post_metadata['date']
        }

        post_html = post_template.render(post=post_data)
        post_file_path = 'output/posts/{slug}.html'.format(slug=post_metadata['slug'])

        os.makedirs(os.path.dirname(post_file_path), exist_ok=True)
        with open(post_file_path, 'w') as file:
            file.write(post_html)

    #Export to ZIP 
    shutil.make_archive(abs_path + "/website", "zip", sourcepath)
    print("made zip!")

    #Send email 
    # libraries to be imported 
    import smtplib 
    from email.mime.multipart import MIMEMultipart 
    from email.mime.text import MIMEText 
    from email.mime.base import MIMEBase 
    from email import encoders 

    fromaddr = "example@example.com"
    toaddr = emailID
    # instance of MIMEMultipart 
    msg = MIMEMultipart() 
    # storing the senders email address   
    msg['From'] = fromaddr 
    # storing the receivers email address  
    msg['To'] = toaddr 
    # storing the subject  
    msg['Subject'] = "Your Webstagram Site"
    # string to store the body of the mail 
    body = "Hi there! Please find the attached zip file of your Webstagram."
    # attach the body with the msg instance 
    msg.attach(MIMEText(body, 'plain')) 
    # open the file to be sent  
    filename = "website.zip"
    attachment = open("website.zip", "rb") 
    # instance of MIMEBase and named as p 
    p = MIMEBase('application', 'octet-stream') 
    # To change the payload into encoded form 
    p.set_payload((attachment).read()) 
    # encode into base64 
    encoders.encode_base64(p) 
    p.add_header('Content-Disposition', "attachment; filename= %s" % filename) 
    # attach the instance 'p' to instance 'msg' 
    msg.attach(p) 
    # creates SMTP session 
    s = smtplib.SMTP('smtp.gmail.com', 587) 
    # start TLS for security 
    s.starttls() 
    # Authentication 
    s.login(fromaddr, "*********") 
    # Converts the Multipart msg into a string 
    text = msg.as_string() 
    # sending the mail 
    s.sendmail(fromaddr, toaddr, text) 
    # terminating the session 
    s.quit() 
main()