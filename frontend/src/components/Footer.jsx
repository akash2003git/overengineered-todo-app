import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="p-3 flex text-3xl space-x-4 justify-center">
      <FaGithub />
      <FaLinkedin />
      <FaSquareXTwitter />
    </div>
  );
}

export default Footer;
