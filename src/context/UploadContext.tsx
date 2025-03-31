import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import Story, { Content } from "../util/StoryUtil";

export interface UploadContexType {
  content: Array<Content>;
  setContent: (content: Array<Content>) => void;
  story: React.RefObject<Story | null>;
}

export const UploadContex = createContext<UploadContexType | undefined>(
  undefined
);

export default function UploadContexProvider({children,}: {children: ReactNode;}) {
  
  const [content, setContent] = useState<Array<Content>>([]);
  const story = useRef<Story | null>(null);

  useEffect(() => {
    if (!story.current) {
      story.current = new Story();
    }
  }, []);

  return (
    <UploadContex.Provider value={{ content, setContent, story }}>
      {children}
    </UploadContex.Provider>
  );
}
