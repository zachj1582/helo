insert into users (username, hash, profile_pic)
values (
    $1,
    $2,
    $3
)
returning id, username, profile_pic;