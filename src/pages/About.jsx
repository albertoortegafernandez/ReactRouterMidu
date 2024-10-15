import { Link } from "../Link.jsx";

const AboutPage = () => {
  return (
    <>
      <h1>About</h1>
      <div>
        <p>Hola soy Alberto y estas en mi React Router</p>
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQFazDTJ2NNoew/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1697537220102?e=2147483647&v=beta&t=Fl1VZMOVHb9Eqi50ABvsXdHQQ9mkx93_HTI0dhAwxM8"
          alt="Foto de Alberto"
        />
      </div>
      <Link to="/">Ir a la Home</Link>
    </>
  );
};
export default AboutPage;
