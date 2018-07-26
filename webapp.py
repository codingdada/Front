from flask import Flask
import pyaudio
import wave
import subprocess
from datetime import datetime
from flask import render_template,jsonify,request,session
import os
import requests
import subprocess
from scipy.io.wavfile import read,write
import numpy as np
import time
from werkzeug.utils import secure_filename
import io

app = Flask(__name__)
app.secret_key = '12345'



def get_rate():
    sml, data = read(session['filepath'])
    print(data.dtype)
    data_new = list(map(lambda x: str(x), data))
    ss = " ".join(data_new)
    return ss, sml


def get_predict():
    ss,sml = get_rate()
    file=session['filename']
    url2 = 'http://172.31.2.212:5000/predict/{0}'.format(str(session['username']))
    #url2 = 'http://139.59.81.2:5000/predict/{0}'.format(str(session['username']))
    response = requests.post(
        url2, json={"payload":ss,
                   "sampling_rate":sml,
                   "file_name":file},
        headers={"Content-Type": "application/json"}
    )



    d = response.json()
    print(d)

    return d['name']

@app.route('/')
def index():
    return render_template('index_1.html')


@app.route('/chat',methods =['POST'])
def chat():
    print(request.form)
    user_name=request.form['text']
    #input_ = request.files['audio_data']
    # in_memory_file = io.BytesIO()
    # input_.save(in_memory_file)
    # input_ = np.fromstring(in_memory_file.getvalue(),dtype=np.int16)
    # print(input_.shape)

    # write(np.array(input_)
    # input.save('test.wav')




    print(user_name)
    CHUNK = 512
    FORMAT = pyaudio.paInt32
    CHANNELS = 1
    RATE = 44100
    RECORD_SECONDS = 5
    subprocess.call(['rm','-r','Sound/{0}/'.format(user_name)])
    subprocess.call(["mkdir","-p",'Sound/{0}/'.format(user_name)])
    # if os._exists('Sound/{0}/'.format(user_name)):
    #     os.rmdir('Sound/{0}/'.format(user_name))
    # else:
    #     os.mkdir('Sound/{0}/'.format(user_name))
    Directory_path ='Sound/{0}/'.format(user_name)
    WAVE_OUTPUT_FILENAME = "Sound/{0}/output_{1}.wav".format(user_name,datetime.now().time())
    session['filepath'] = WAVE_OUTPUT_FILENAME
    session['filename'] = "output_{0}.wav".format(datetime.now().time())
    session['username'] = user_name
    print(WAVE_OUTPUT_FILENAME)

    p = pyaudio.PyAudio()

    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    print("* recording")

    frames = []

    for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        data = stream.read(CHUNK)
        frames.append(data)

    print("* done recording")

    stream.stop_stream()
    stream.close()
    p.terminate()
    wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()
    # write(WAVE_OUTPUT_FILENAME,44100,input_)
    # input_.save(WAVE_OUTPUT_FILENAME)
    label=get_predict()
    #label='Tanmay'
    #label = "Hello"
    print('label-->',label)
    if str(label):
        print ("yesssssss")

        return jsonify({"status": "success", "response": str(label)})
    else:
        return jsonify({"status": "success", "response": "Not Authenticated"})




if __name__ == '__main__':
   app.run(debug=True)