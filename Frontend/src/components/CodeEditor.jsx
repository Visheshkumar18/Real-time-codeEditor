import React, { useEffect, useRef } from 'react'
import Codemirror from "codemirror"
import 'codemirror/lib/codemirror.css'
import "codemirror/theme/monokai.css";
import 'codemirror/mode/javascript/javascript'
import "codemirror/mode/clike/clike";
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'

const CodeEditor = ({ roomId, socket }) => {
  const editorRef = useRef(null);

  // INIT EDITOR
  useEffect(() => {
    const editor = Codemirror.fromTextArea(
      document.getElementById("realtimeEditor"),
      {
        mode: { name: "javascript", json: true },
        theme: "monokai",
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        viewportMargin: Infinity,
      }
    );

    editorRef.current = editor;

    // when user types, emit code
    editor.on("change", (instance, changes) => {
      const { origin } = changes;

      if (origin !== "setValue") {
        const code = instance.getValue();
        socket.emit("code-change", { roomId, code });
      }
    });

  }, []);

  // LISTEN FOR CODE FROM OTHERS
  useEffect(() => {
    const handleCode = (newCode) => {
      if (editorRef.current) {
        const cursor = editorRef.current.getCursor();
        editorRef.current.setValue(newCode);
        editorRef.current.setCursor(cursor);
      }
    };

    socket.on("code-change", handleCode);

    return () => {
      socket.off("code-change", handleCode);
    };
  }, [socket, roomId]);

  return (
    <div className="w-full h-screen">
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
};

export default CodeEditor;
