select * from posts p
join users u on p.author_id = u.id
where u.id != $1;
