
from flask import Flask,request,jsonify,render_template,make_response
from flask_restful import Resource, Api
import numpy as np
from scipy.io.wavfile import write
import os
import subprocess

app = Flask(__name__)
api = Api(app)


class Data(Resource):
    def post(self,name):
        data = request.json
        payload = data['payload']
        sampling_rate = int(data['sampling_rate'])
        file_name = data['file_name']
        sound_array = np.fromstring(payload,dtype=np.int32, sep=" ")
        print(sound_array)
        print(sound_array.shape)
        folder_name = "API_Request/" + "Predict/" + name + "/"
        subprocess.call(["mkdir","-p",folder_name])
        file_name = folder_name + file_name
        write(file_name,sampling_rate,sound_array)
        return {"name":name }


api.add_resource(Data,'/predict/<string:name>')

app.run(port=6000,debug=True,host="0.0.0.0")