<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\Email(message: "L'email n'est pas valide.")]
    #[Assert\NotBlank(message: "L'email est obligatoire.")]
    private $email;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\Length(min: 3, max: 255, minMessage: 'Le titre doit avoir 3 caractères minimum.', maxMessage: 'Le titre doit avoir 255 caractères maximum.')]
    #[Assert\NotBlank(message: "Le titre de message ne peut être vide.")]
    private $title;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: "Le contenu du message ne peut pas être vide.")]
    #[Assert\Length(min: 3, minMessage: "Le contenu de votre message doit avoir 3 caractères minimum.")]
    private $content;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }
}
