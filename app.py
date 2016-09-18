from flask import Flask
from flask import render_template, jsonify
app = Flask(__name__)

from rf import transmit_code as rf_send
from rf import codes as rf_codes

@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route(u'/turn/<device>/<state>')
def rf(device, state):
    mapping = {
        "a": "a",
        "b": "b",
        "c": "c",
        "tv": "b",
        "speakers": "a"
    }
    switch = mapping.get(device)
    if not switch:
        return "Unknown device"
    if state in ["no", "off", "false"]:
        state = "off"
    elif state in ["yes", "on", "true"]:
        state = "on"
    else:
        return "Wrong Argument for state"
    rf_send(rf_codes.get("{}_{}".format(
        switch, state
    )))
    return jsonify(state=state)
