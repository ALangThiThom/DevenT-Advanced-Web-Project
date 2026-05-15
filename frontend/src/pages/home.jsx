import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Chào mừng bạn đến với DevenT
      </h1>
      <p className="text-gray-600 mb-8">
        Vui lòng chọn loại tài khoản bạn muốn đăng ký
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => navigate("/attendee/register")}
          className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Tôi là Người tham gia (Attendee)
        </button>

        <button
          onClick={() => navigate("/organizer/register")}
          className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Tôi là Ban tổ chức (Organizer)
        </button>
      </div>
    </div>
  );
};

export default Home;
