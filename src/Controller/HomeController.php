<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(): Response
    {
        $skills = array("HTML", "CSS", "SASS", "JAVASCRIPT", "REACT", "NODEJS", "PHP", "SYMFONY", "MYSQL", "MONGODB");

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'skills' => $skills
        ]);
    }
    #[Route('/download-cv', name: 'download_cv')]
    public function downloadCv()
    {
        header("Content-Type: application/octet-stream");
  
        $file = 'images/cv-romain.pdf';
        $nameFile = 'cv-romain-aubry.pdf';
        
        header("Content-Disposition: attachment; filename=" . urlencode($nameFile));   
        header("Content-Type: application/download");
        header("Content-Description: File Transfer");            
        header("Content-Length: " . filesize($file));
        
        flush(); // This doesn't really matter.
        
        $fp = fopen($file, "r");
        while (!feof($fp)) {
            echo fread($fp, 65536);
            flush(); // This is essential for large downloads
        } 
        
        fclose($fp);
    }
}
