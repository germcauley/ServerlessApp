
from flask import Flask, jsonify, url_for, render_template, redirect,request
# from forms import ContactForm

app = Flask(__name__)




@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/page/")
def page():
    return render_template('page.html')


@app.route("/replies/")
def replies():
    return render_template('replies.html')