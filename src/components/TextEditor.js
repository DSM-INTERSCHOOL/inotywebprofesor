import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { uploadImageBlob } from "../services/uploads";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { setContenido } from "../store/actions/publicacionActions";

export const TextEditor = () => {
  const contenido = useSelector((state) => state.publicaciones.contenido);

  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    if (editorRef.current) {
      const cuerpo = editorRef.current.getContent();
	//   console.log('cuerpo', cuerpo)
      dispatch(setContenido({ ...contenido, cuerpo }));
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        fullWidth
        value={contenido.titulo}
        placeholder="Título"
        onChange={(e) => {
          console.log("e.target.value", e.target.value);
          dispatch(setContenido({ ...contenido, titulo: e.target.value }));
        }}
      />

      <Editor
        apiKey="a8bvz8ljrja6c147qm0xdh4nplqv7pmodepk5gnc6pgnx0ci"
        value={contenido.cuerpo}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: true,
          automatic_uploads: true,
          images_upload_handler: function (
            blobInfo,
            success,
            failure,
            progress
          ) {
            //console.log('blobInfo', blobInfo);
            //console.log('blobInfo.filename()', blobInfo.filename());
            //console.log('success', success);
            //console.log('failure', failure);
            //console.log('progress', progress);

            uploadImageBlob(blobInfo)
              .then((res) => {
                success(res.location);
              })
              .catch((e) => {
                console.log("e", e);
              });
          },

          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | image | imagetools | imagepicker | help",
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};
