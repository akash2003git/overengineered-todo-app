import React from "react";
import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="p-3 flex text-3xl space-x-4 justify-center mt-auto">
      <a
        href="https://github.com/akash2003git/overengineered-todo-app"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/akash-tayade-"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://x.com/akash2003_dev"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter profile"
      >
        <FaSquareXTwitter />
      </a>
    </div>
  );
}

export default Footer;
