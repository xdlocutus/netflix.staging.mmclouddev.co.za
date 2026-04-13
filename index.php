<?php
$siteTitle = 'Netflix Clone Staging';
$heroTitle = 'Unlimited movies, TV shows, and more';
$heroSubtitle = 'Watch anywhere. Cancel anytime.';
$ctaText = 'Get Started';
$year = date('Y');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?php echo htmlspecialchars($siteTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/styles.css" />
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary-subtle">
        <div class="container">
            <a class="navbar-brand fw-bold text-danger" href="#"><?php echo htmlspecialchars($siteTitle, ENT_QUOTES, 'UTF-8'); ?></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mainNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="hero-section text-white text-center d-flex align-items-center">
        <div class="container">
            <h1 class="display-4 fw-bold mb-3"><?php echo htmlspecialchars($heroTitle, ENT_QUOTES, 'UTF-8'); ?></h1>
            <p class="lead mb-4"><?php echo htmlspecialchars($heroSubtitle, ENT_QUOTES, 'UTF-8'); ?></p>
            <button id="ctaBtn" class="btn btn-danger btn-lg px-4"><?php echo htmlspecialchars($ctaText, ENT_QUOTES, 'UTF-8'); ?></button>
            <p class="mt-3 small text-light-emphasis" id="ctaMessage"></p>
        </div>
    </header>

    <section id="features" class="py-5 bg-dark text-light">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card h-100 bg-black text-light border-secondary">
                        <div class="card-body">
                            <h5 class="card-title">Watch on any device</h5>
                            <p class="card-text">Use responsive Bootstrap components for a modern multi-device experience.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 bg-black text-light border-secondary">
                        <div class="card-body">
                            <h5 class="card-title">PHP-powered templates</h5>
                            <p class="card-text">Server-side PHP variables render dynamic content without changing frontend layout.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 bg-black text-light border-secondary">
                        <div class="card-body">
                            <h5 class="card-title">Interactive JavaScript</h5>
                            <p class="card-text">Frontend events provide immediate user feedback and simple interactions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer id="contact" class="py-4 text-center text-light border-top border-secondary-subtle bg-black">
        <div class="container">
            <small>&copy; <?php echo htmlspecialchars($year, ENT_QUOTES, 'UTF-8'); ?> <?php echo htmlspecialchars($siteTitle, ENT_QUOTES, 'UTF-8'); ?>. All rights reserved.</small>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/app.js"></script>
</body>
</html>
