exports.authenticated = () => {
	return (ctx, next) => {
		if (ctx.isAuthenticated()) {
			return next();
		} else {
			ctx.redirect('/');
		}
	}
}