from scipy.io.wavfile import read,write
import numpy as np

def get_audio_string(filepath="Sound/Tanmay/output_16:01:05.741897.wav"):
    sml, data= read(filepath)
    data_new = list(map(lambda x:str(x),data))
    ss = " ".join(data_new)
    return ss, sml


def decode(ss,sml):
    data_new = np.fromstring(ss,dtype=np.int16,sep=" ")
    write("check.wav",sml,data_new)


ss,sml = get_audio_string()
decode(ss,sml)
