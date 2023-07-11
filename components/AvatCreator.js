
import { AvatarCreatorViewer } from "@readyplayerme/rpm-react-sdk";
import { useState } from "react";

const loadingNode = (
  <div
    style={{
      height: "100%",
      width: "100%",
      color: "orange",
      backgroundColor: "rebeccapurple",
      textAlign: "center",
      marginTop: 100
    }}
  >
    Loading Avatar
  </div>
);

export default function AvatarCreate() {
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");

  const handleAvatarExported = (url) => {
    setUrl(url);
  };

  const handleUserSet = (id) => {
    setId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <AvatarCreatorViewer
          subdomain="demo"
          onAvatarExported={handleAvatarExported}
          onUserSet={handleUserSet}
          editorConfig={{
            bodyType: "fullbody",
            clearCache: true
          }}
          viewerConfig={{
            shadows: true,
            style: {
              backgroundColor: "rebeccapurple"
            }
          }}
          loadingNode={loadingNode}
        />
      </div>
      <div>
        <b>Avatar URL:</b> {`${url}`}
      </div>
      <div>
        <b>User ID:</b> {`${id}`}
      </div>
    </div>
  );
}
