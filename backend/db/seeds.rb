CLOUDINARY_IMAGES = [
  "https://res.cloudinary.com/dnzkxyfdv/image/upload/v1621204014/travellog/sample_1.jpg",
  "https://res.cloudinary.com/dnzkxyfdv/image/upload/v1621751832/travellog/sample_2.jpg",
  "https://res.cloudinary.com/dnzkxyfdv/image/upload/v1621751832/travellog/sample_3.jpg",
]

3.times do |i|
  user = User.create(
    name: "test#{i+1}",
    email: "test#{i+1}@example.com",
    password: 'foobar',
    password_confirmation: 'foobar'
  )
end

20.times do |i|
  post = Post.create(
    title: Faker::Company.bs.titlecase,
    body: Faker::Lorem.paragraph_by_chars(number: 1000, supplemental: false),
    place: Faker::Nation.capital_city,
    user_id: i % 3 + 1
  )

  post.create_eyecatch(image: CLOUDINARY_IMAGES[post.id % 3])
end
