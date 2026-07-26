# Portfolio — Codjovi Guillaume Hounkpati

Portfolio personnel bilingue (FR / EN) d'un ingénieur informatique / développeur
Guidewire. Site statique, sans framework ni dépendance à installer.

## Structure

```
portfolio/
├── index.html            # Structure et contenu de la page
├── css/style.css         # Styles (design, mise en page, responsive)
├── js/main.js            # Interactions (FR/EN, menu, retour en haut, carrousels)
├── assets/
│   ├── profile.jpg       # Photo de profil (Hero)
│   ├── logos/            # Logos des entreprises (section Expérience)
│   ├── icons/            # Icônes des langages/outils (section Compétences)
│   └── projects/         # Images des carrousels de projets
├── cv.pdf                # CV téléchargeable depuis la section Contact
└── README.md
```

## Lancer le site en local

Le plus simple : ouvrir `index.html` dans un navigateur.

Pour un rendu identique à la production (chemins relatifs, etc.), servir le
dossier avec un petit serveur local :

```bash
# Python
python3 -m http.server 8000

# ou Node
npx serve
```

Puis ouvrir http://localhost:8000

## Personnaliser

- **Photo** : remplacer `assets/profile.jpg` (format carré recommandé).
- **CV** : remplacer `cv.pdf` par la version à jour.
- **Logos d'entreprise** : remplacer les fichiers `assets/logos/*.svg` par les vrais logos (SVG ou PNG à fond transparent, format carré de préférence). Ce sont pour l'instant de simples monogrammes.
- **Liens LinkedIn / GitHub** : dans `index.html`, section `#contact`,
  remplacer les `href="#"`.
- **Textes** : chaque élément traduisible a une version française (visible dans
  le HTML) et une version anglaise dans l'attribut `data-en`. Pour modifier un
  texte, penser à mettre à jour **les deux**.
- **Logos des entreprises** : remplacer les fichiers dans `assets/logos/`
  (`macif.svg`, `ghana-tvet.svg`, `enedis.svg`) par les logos officiels. Ce sont
  actuellement des monogrammes provisoires.
- **Images des projets** : déposer tes captures dans `assets/projects/`. Chaque
  projet lit `<projet>-1`, `<projet>-2`, `<projet>-3` (ex. `chatbot-1.svg`).
  Tu peux utiliser des `.jpg`/`.png` : garde les mêmes noms ou mets à jour les
  `src` dans la section Projets d'`index.html`. Pour ajouter/retirer une image
  d'un carrousel, ajoute/enlève simplement une balise `<img>` dans le
  `.carousel-track` correspondant (les puces se génèrent automatiquement).
- **Icônes des compétences** : jeu d'icônes Devicon dans `assets/icons/`.
- **Couleur d'accent** : variable `--accent` en haut de `css/style.css`.

## Fonctionnement du bilingue

Au chargement, `main.js` mémorise la version française de chaque élément portant
un attribut `data-en`, puis bascule le contenu (`innerHTML`), le titre de l'onglet
et l'attribut `lang` de la page au clic sur les boutons **FR / EN**.

## Accessibilité

Navigation clavier avec focus visibles, libellés ARIA, et respect de la
préférence `prefers-reduced-motion` (animations désactivées si demandé).

## Déploiement

Site 100 % statique : déployable tel quel sur GitHub Pages, Netlify, Vercel,
Cloudflare Pages ou tout hébergement de fichiers.
