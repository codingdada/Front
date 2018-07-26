#!/usr/bin/env bash
Directory_path=$1
echo $Directory_path

rsync $Directory_path/*.wav bibek@139.59.81.2:/home/bibek/VoiceSink/predict/