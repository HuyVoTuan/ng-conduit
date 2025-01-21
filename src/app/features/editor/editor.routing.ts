import { Routes, RouterModule } from "@angular/router";
import { NewEditorComponent } from "./new-editor/new-editor.component";
import { EditEditorComponent } from "./edit-editor/edit-editor.component";

const routes: Routes = [
  {
    path: "",
    component: NewEditorComponent,
    data: { title: "New Article" },
  },
  {
    path: ":slug",
    component: EditEditorComponent,
    data: { title: "Edit Article" },
  },
];

export const EditorRoutes = RouterModule.forChild(routes);
