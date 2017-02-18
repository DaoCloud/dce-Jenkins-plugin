FROM daocloud.io/nginx

LABEL io.daocloud.dce.plugin.name="Jenkins" \
      io.daocloud.dce.plugin.description="Jenkins 的前身是 Hudson 是一个可扩展的持续集成引擎" \
      io.daocloud.dce.plugin.categories="continuous-integration" \
      io.daocloud.dce.plugin.icon-src="data:image/png;base64,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" \
      io.daocloud.dce.plugin.vendor="Community" \
      io.daocloud.dce.plugin.required-dce-version=">=2.4.0" \
      io.daocloud.dce.plugin.nano-cpus-limit="500000000" \
      io.daocloud.dce.plugin.memory-bytes-limit="52428800"

COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY . /usr/share/nginx/html/
