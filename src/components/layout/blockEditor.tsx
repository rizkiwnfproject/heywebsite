"use client";

import React from "react";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/react/style.css";

interface Props {
  initialContent?: any;
  onChange?: (content: any) => void;
  readOnly?: boolean;
}

const BlockEditor: React.FC<Props> = ({
  initialContent,
  onChange,
  readOnly,
}) => {
  const safeContent =
    Array.isArray(initialContent) && initialContent.length > 0
      ? initialContent
      : [
          {
            id: "init-block",
            type: "paragraph",
            content: "",
          },
        ];

  const editor = useCreateBlockNote({
    initialContent: safeContent,
  });

  return (
    <div className="border rounded p-2 blocknote-wrapper">
      <BlockNoteView
        editor={editor}
        onChange={() => {
          if (!readOnly && onChange) {
            onChange(editor.document);
          }
        }}
        theme="light"
        editable={!readOnly}
        style={{
          minHeight: "60vh",
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        {!readOnly && (
          <div className="bg-white">
            <FormattingToolbarController
              formattingToolbar={() => (
                <div className="space-x-2">
                  <FormattingToolbar>
                    <BlockTypeSelect key={"blockTypeSelect"} />
                    <FileCaptionButton key={"fileCaptionButton"} />
                    <FileReplaceButton key={"replaceFileButton"} />
                    <BasicTextStyleButton
                      basicTextStyle={"bold"}
                      key={"boldStyleButton"}
                    />
                    <BasicTextStyleButton
                      basicTextStyle={"italic"}
                      key={"italicStyleButton"}
                    />
                    <BasicTextStyleButton
                      basicTextStyle={"underline"}
                      key={"underlineStyleButton"}
                    />
                    <BasicTextStyleButton
                      basicTextStyle={"strike"}
                      key={"strikeStyleButton"}
                    />
                    <BasicTextStyleButton
                      key={"codeStyleButton"}
                      basicTextStyle={"code"}
                    />
                    <TextAlignButton
                      textAlignment={"left"}
                      key={"textAlignLeftButton"}
                    />
                    <TextAlignButton
                      textAlignment={"center"}
                      key={"textAlignCenterButton"}
                    />
                    <TextAlignButton
                      textAlignment={"right"}
                      key={"textAlignRightButton"}
                    />
                    <ColorStyleButton key={"colorStyleButton"} />
                    <NestBlockButton key={"nestBlockButton"} />
                    <UnnestBlockButton key={"unnestBlockButton"} />
                    <CreateLinkButton key={"createLinkButton"} />
                  </FormattingToolbar>
                </div>
              )}
            />
          </div>
        )}
      </BlockNoteView>
    </div>
  );
};

export default BlockEditor;
