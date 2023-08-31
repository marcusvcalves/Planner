import Navbar from '../../components/navbar/navbar'

import './error_page.css';

function ErrorPage() {

  return (
    <>
    <Navbar />
    <div id="error-page">
      <h1>Ops!</h1>
      <p>Esta página não existe!</p>
    </div>
    </>
  );
}

export default ErrorPage;