const Avatar = ({ name, size = 40 }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div
      className="flex items-center justify-center rounded-full bg-black text-white font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size / 2.5,
      }}
    >
      {initial}
    </div>
  );
};

export default Avatar;