import directors;

backend backend1 {
	.host = "wordpress";
	.port = "80";
}

sub vcl_init {
	new backends = directors.round_robin();
	backends.add_backend(backend1);
}

sub vcl_recv {
	set req.backend_hint = backends.backend();
}
