import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./style.css";
import MediaLib from "../MediaLib";
import { StrapiMediaLib } from "../../../../../strapi-plugin-ckeditor/admin/src/components/CKEditorInput/plugins/StrapiMediaLib"; // Eklentiyi doğru path ile import edin.

const CustomCKEditor = ({ onChange, name, value }) => {
  const [mediaLibVisible, setMediaLibVisible] = useState(false);

  const handleToggleMediaLib = () => {
    setMediaLibVisible((prev) => !prev);
  };

  const handleChangeAssets = (assets) => {
    let newValue = value ? value : '';

    assets.forEach((asset) => {
      if (asset.mime.includes('image')) {
        const imgTag = `<p><img src="${asset.url}" alt="${asset.alt}" /></p>`;
        newValue = `${newValue}${imgTag}`;
      }
    });

    onChange({ target: { name, value: newValue } });
    handleToggleMediaLib();
  };

  useEffect(() => {
    // StrapiMediaLib eklentisini CKEditor yapısına ekleyin
    ClassicEditor.builtinPlugins = [
      ...ClassicEditor.builtinPlugins,
      StrapiMediaLib
    ];
  }, []);

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            '|',
            'strapiMediaLib', // StrapiMediaLib butonunu toolbar'a ekleyin
          ],
        }}
        data={value}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
          // Media Library toggle fonksiyonunu eklentiye bağlayın
          const strapiMediaLibPlugin = editor.plugins.get('strapiMediaLib');
          strapiMediaLibPlugin.connect(handleToggleMediaLib);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
      />
      <MediaLib 
        isOpen={mediaLibVisible} 
        onChange={handleChangeAssets}
        onToggle={handleToggleMediaLib} 
      />
    </>
  );
};

export default CustomCKEditor;
