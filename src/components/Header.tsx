import headerImg from '../assets/header.jpg'
export default function Header() {
  return (
      <header className="h-full w-full">
        <img src={headerImg} alt="header" className="h-full w-full"/>
      </header>
  );
}
