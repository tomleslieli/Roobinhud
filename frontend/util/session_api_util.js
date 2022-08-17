export const login = (user) =>
  $.ajax({
    url: "/api/session",
    method: "POST",
    data: { user },
  });

export const signup = (user) =>
  $.ajax({
    url: "/api/users",
    method: "POST",
    data: { user },
  });

  export const update = (user) =>
  $.ajax({
    url: `/api/users/${user.id}`,
    method: 'PATCH',
    data: {user}
  });

  export const getUser = (userId) =>
  $.ajax({
    url: `/api/users/${userId}`,
    method: 'GET',
  })

export const logout = () =>
  $.ajax({
    url: "/api/session",
    method: "DELETE",
  });