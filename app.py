from flask import Flask, render_template, url_for, request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('home.html')


@app.route('/asyncjs/<int:num>')
def asyncjs_func(num):
    return render_template(f'asyncJS{num}.html')



if __name__ == '__main__':
    app.run()
