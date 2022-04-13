import "font-awesome/css/font-awesome.min.css";
import "../CSS/Footer.css";
export default function Footer() {
  return (
    <div>
      <footer
        class="stick-bottom text-center text-white p-4"
        style={{ background: "rgb(30, 30, 30)" }}
      >
        <div class="container-fluid p-1">
          <a
            class="btn btn-outline-light btn-floating m-2"
            href="https://www.facebook.com/login.php"
            type="button"
          >
            <i class="fa fa-facebook-f"></i>
          </a>
          <a
            class="btn btn-outline-light btn-floating m-2"
            href="https://twitter.com/login/"
            type="button"
          >
            <i class="fa fa-twitter"></i>
          </a>
          <a
            class="btn btn-outline-light btn-floating m-2"
            href="https://myaccount.google.com/"
            Type="button"
          >
            <i class="fa fa-google"></i>
          </a>
          <a
            class="btn btn-outline-light btn-floating m-2"
            href="https://www.instagram.com"
            type="button"
          >
            <i class="fa fa-instagram"></i>
          </a>
          <a
            class="btn btn-outline-light btn-floating m-2"
            href="https://www.linkedin.com/uas/login"
            type="button"
          >
            <i class="fa fa-linkedin"></i>
          </a>
          <a
            class="btn btn-outline-light btn-floating m-2"
            href="https://github.com/login"
            type="button"
          >
            <i class="fa fa-github"></i>
          </a>
        </div>
        <div>
          <h2>Medicine Tracker and Purchase</h2>
          <p>Email: medtrackerproject22@gmail.com</p>
        </div>
        <div class="text-center p-1">
          © 2022 Copyright :
          <a class="text-white" href="localhost:3000">
            MedTracker.in
          </a>
        </div>
        <br />
      </footer>
    </div>
  );
}
