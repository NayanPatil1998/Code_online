import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ConsoleSection from "../components/ConsoleSection";
import EditorComponent from "../components/EditorComponent";
import { dummyFilesData } from "../helpers/data";
interface EditorProps {}

const EditorContainer: React.FC<EditorProps> = ({}) => {
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("console.log('Hello world')");

  // library.add(faHtml5, faCss3, faJs);
  const fileNameBarClasses =
    "flex items-center cursor-pointer hover:bg-black justify-start w-full p-2 ";

  const [activeFile, setActiveFile] = useState("index.html");

  const [srcDoc, setSrcDoc] = useState("");

  
  // useKey('ctrls', () => console.log('Ctrl+S fired!'));

  const changeCode = () => {
    setSrcDoc(`
    <html>
      <style>
      ${css}</style>
      <body>${html}</body>
      <script>
      const originalLog = console.log;
      console.log = (...args) => {
        
        parent.window.postMessage({ type: 'log', args: args }, '*')
        originalLog(...args)
      };
      const originalWarn = console.warn;
      console.warn = (...args) => {
        
        parent.window.postMessage({ type: 'warn', args: args }, '*')
        originalWarn(...args)
      };
      const originalError= console.error;
      console.error = (...args) => {
        
        parent.window.postMessage({ type: 'error', args: args }, '*')
        originalError(...args)
      };
      window.onerror = function(msg, url, line){
        parent.window.postMessage({ type: 'error', args: msg, line: line}, '*')
      }
      ${js}</script>
    </html>
    `);
  }
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      changeCode()
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const getCodeByFileName = (fileName: string): string => {
    let code = "";
    switch (fileName) {
      case "index.html":
        code = html;
        break;

      case "style.css":
        code = css;
        break;

      case "script.js":
        code = js;
        break;

      default:
        break;
    }
    return code;
  };
  const ChangeCodeByFileName = (fileName: string, value: string) => {
    let code = "";
    switch (fileName) {
      case "index.html":
        setHtml(value);
        break;

      case "style.css":
        setCss(value);
        break;

      case "script.js":
        setJs(value);
        break;

      default:
        break;
    }
  };

  return (
    
    <div className="flex min-h-screen text-white">
      <Head>
        <title>Editor | Code Online</title>
      </Head>
      <div className="flex-1 grid grid- grid-cols-editor ">
        <div className=" bg-bgdark flex-col px-2">
          <div className="flex items-center px-4 w-full h-32 ">
            <Image width={50} height={50} src="/logo-white.png" />
            <h1 className="font-extrabold text-2xl">Code Online</h1>
          </div>
          <hr />
          <div className="flex-col  my-4 w-full ">
            {Object.keys(dummyFilesData).map((keyName, i) => {
              // @ts-ignore
              let fileData = dummyFilesData[keyName];

              return (
                <div
                  key={fileData.language}
                  onClick={() => {
                    setActiveFile(fileData.name);
                  }}
                  className={
                    fileData.name === activeFile
                      ? fileNameBarClasses + "bg-black"
                      : fileNameBarClasses
                  }
                >
                  {/* <FontAwesomeIcon
                    color={fileData.iconColor}
                    icon={["fab", fileData.iconName as IconName]}
                  /> */}
                  <Image width="20px" height="20px" src={fileData.iconName} />
                  <p className="mx-4">{fileData.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" grid grid-cols-2 ">

          <EditorComponent
          onClickFunc={() => {
            changeCode()

          }}
            onChange={(value) => {
              ChangeCodeByFileName(activeFile, value as string);
            }}
            code={getCodeByFileName(activeFile)}
            language={
              // @ts-ignore
              dummyFilesData[activeFile]?.language
            }
          />
          <div className="grid grid-rows-[70vh_270px]">
            <iframe srcDoc={srcDoc} className="flex w-full h-full"></iframe>
            <div className="bg-bgdark">
              
              <ConsoleSection />
            </div>
          </div>
          {/* // dummyFilesData.find((element) => element.name === activeFile) */}
        </div>
      </div>
    </div>
  );
};

export default EditorContainer;
