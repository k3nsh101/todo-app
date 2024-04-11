import { Route, Routes } from 'react-router-dom';

import TaskForm from './TaskForm';
import CategoryForm from './CategoryForm';

function App() {
return (
  <Routes>
    {/* <Route path="/" element={<Home />} /> */}
    <Route path='/new-task' element={<TaskForm />} />
    <Route path='/new-category' element={<CategoryForm />} />
  </Routes>
)
}

export default App