FROM gcr.io/google-appengine/python
ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH
RUN apt-get update && apt-get install -y build-essential checkinstall
RUN apt-get install -y xvfb
RUN apt-get install -y firefox
RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.32.0/geckodriver-v0.32.0-linux64.tar.gz
RUN tar -xvzf geckodriver-v0.32.0-linux64.tar.gz
RUN chmod +x geckodriver
RUN wget https://www.python.org/ftp/python/3.9.7/Python-3.9.7.tgz
RUN tar xzf Python-3.9.7.tgz
RUN cd Python-3.9.7 && ./configure --enable-optimizations
RUN cd Python-3.9.7 && make altinstall
RUN python3.9 -m pip install --upgrade pip
ADD . /app
RUN cd /app && pip3 install -r requirements.txt
CMD exec gunicorn -b :$PORT main --timeout 180 --workers 1