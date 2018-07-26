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

CHUNK = 512
FORMAT = pyaudio.paInt32
CHANNELS = 1
RATE = 44100
RECORD_SECONDS = 120
# subprocess.call(['rm','-r','Sound/{0}/'.format(user_name)])
# subprocess.call(["mkdir","-p",'Sound/{0}/'.format(user_name)])
# if os._exists('Sound/{0}/'.format(user_name)):
#     os.rmdir('Sound/{0}/'.format(user_name))
# else:
#     os.mkdir('Sound/{0}/'.format(user_name))

WAVE_OUTPUT_FILENAME = "Sound/output_new_{0}.wav".format(datetime.now().time())
# session['filepath'] = WAVE_OUTPUT_FILENAME
# session['filename'] = "output_{0}.wav".format(datetime.now().time())
# session['username'] = user_name
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