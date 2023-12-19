require "test_helper"

class EyecatchesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get eyecatches_create_url
    assert_response :success
  end
end
