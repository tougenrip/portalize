import { Button, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {ImDownload} from 'react-icons/im'




const InstallPWA = ({className}) => {
    let deferredPrompt;  
    const [installable, setInstallable] = useState(false);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
          // Prevent the mini-infobar from appearing on mobile
          e.preventDefault();
          // Stash the event so it can be triggered later.
          deferredPrompt = e;
          // Update UI notify the user they can install the PWA
          setInstallable(true);
        });
    
        window.addEventListener('appinstalled', () => {
          // Log install to analytics
          console.log('INSTALL: Success');
        });
      }, []);
    
      const handleInstallClick = (e) => {
          // Hide the app provided install promotion
          setInstallable(false);
          // Show the install prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
          });
      };
      if(installable){
        return (
            <Tooltip
        content="Install the App"
        >
            <Button
            className={className}
            id="setup_button"
            aria-label="Install app"
            title="Install app"
            color="purple"
            variant="gradient"
            onClick={handleInstallClick}
            >
            <ImDownload className="h-5 w-5 self-center group-hover:scale-105"/>
            </Button>
        </Tooltip>
        )
      }
  return null;
};

export default InstallPWA;

