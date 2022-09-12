<?php

namespace App\Controller;

use App\Entity\Message;
use App\Form\Type\MessageType;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'contact')]
    public function index(Request $request, ManagerRegistry $doctrine): Response
    {

        $message = new Message();
        $entityManager = $doctrine->getManager();

        $form = $this->createForm(MessageType::class, $message);

        $form->handleRequest($request);
        if($form->isSubmitted()){
            if($form->isValid()){
                $message = $form->getData();
                $entityManager->persist($message);
                $entityManager->flush();
            }
            else $error = "error";
        }

        return $this->render('contact/index.html.twig', [
            'controller_name' => 'ContactController',
            'form' => $form->createView(),
            'error' => (!empty($error) ? $error : '')
        ]);
    }
}
