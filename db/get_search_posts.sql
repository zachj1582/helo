select * from posts p
join users u on p.author_id = u.id
where p.title ilike = '%$1%';

-- returning *;