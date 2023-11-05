import { Facebook, Github, Instagram, Twitter, TwitterIcon } from "lucide-react";
import tmdb_logo from "@/public/tmdb_logo.svg"

export default function Footer(){
  return (
    <div className="w-full flex items-center text-white flex-col p-4 space-y-2 border-t border-t-white">
      <p className="text-center">Hey I'm Mrinmoy Mondal a Web Developer From India.</p>
      <p>This app is made as demo.</p>
      <div className="flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col space-y-2">
          <p>Follow Me on:</p>
          <p className="flex space-x-4" >
            <a href="https://www.instagram.com/themrinmoymondal/" target="_blank">
              <Instagram size="24" />
            </a>
            <a href="https://twitter.com/themrinmoyreal" target="_blank">
              <Twitter size="24" />
            </a>
            <a href="https://www.facebook.com/mrinmoy.mandal.585/" target="_blank">
              <Facebook size="24" />
            </a>
            <a href="https://github.com/mrinmoymondalreal" target="_blank">
              <Github size="24" />
            </a>
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p>Made with ❤️ in India </p>
          <p>All Movie data is given by: </p>
          <p><img src={tmdb_logo.src} width={200} alt="" /></p>
        </div>
      </div>
    </div>
  );
}