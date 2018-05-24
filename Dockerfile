FROM daocloud.io/python:2.7-alpine

LABEL maintainer="Pike" \
      io.daocloud.dce.plugin.name="Jenkins" \
      io.daocloud.dce.plugin.description="Jenkins 是一个可扩展的持续集成引擎" \
      io.daocloud.dce.plugin.categories="continuous-integration" \
      io.daocloud.dce.plugin.vendor="Community" \
      io.daocloud.dce.plugin.required-dce-version=">=2.5.2" \
      io.daocloud.dce.plugin.nano-cpus-limit="500000000" \
      io.daocloud.dce.plugin.memory-bytes-limit="52428800"

RUN apk add --update nginx \
  && rm -rf /var/cache/apk/* \
  && ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

COPY ./requirements.txt /usr/src/
RUN pip install -r /usr/src/requirements.txt -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com

COPY nginx /etc/nginx/
COPY html /usr/share/nginx/html/
COPY app.py /usr/local/bin/

COPY supervisord.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/supervisord.sh

CMD ["sh", "/usr/local/bin/supervisord.sh"]
