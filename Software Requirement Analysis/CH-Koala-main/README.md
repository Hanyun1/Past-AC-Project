# ChatGPT for NDIS Plans

The National Disability Insurance Scheme (NDIS) is a project founded by government aiming to benefit up to 500,000 Australians with disabilities. Every individual is assessed by the NDIS and receives their “plan” consisting of a budget to support their lives and achieve their goals across fifteen different categories. This includes day-to-day living, capital items, and learning and growth initiatives. However, the process of developing these plans is time-consuming and opaque, which rely on manual processes, planner experience and hidden standards.

In order to overcome these difficulties, Capital Guardians expected to build a publicly available tool with the API of ChatGPT to automate the process and avoiding spending large amount of time on revision. The main propose of project is to implement a free, simple and public tool that can be comfortably used by those who have no financial background, providing them with a streamlined solution to produce suitable plans and budgets.

## Clients

| Name | Email | Role |
| --- | --- | --- |
| Ross McDonald | ross.mcdonald@capitalguardians.com | CEO, Capital Guardians |
| Stephanie Gunn | andotwo@gmail.com | Former NDIA Deputy CEO, Plan Development Advisory |
| Simplice M Songoya | simcity360@gmail.com | Former NDIA Planner, Plan Development Advisory |

## Supervisors

| Name | Email |
| --- | --- |
| Eduardo Araujo Oliveira | eduardo.oliveira@unimelb.edu.au |
| Madhavi Mohoni | m.mohoni@unimelb.edu.au |

## Team Members

| Name | Email | Role |
| --- | --- | --- |
| Eldon Yeh | eldony@student.unimelb.edu.au | Product Owner |
| Emmanuel Pinca | epinca@student.unimelb.edu.au | Scrum Master |
| Hanyun Zhang | hanyzhang@student.unimelb.edu.au | Design Leader |
| Ruiqi Yu | ruyu@student.unimelb.edu.au | Developer |
| Simon Chen | chunyuc1@student.unimelb.edu.au | Developer |

## Project Structure

```
├── data samples                                      # Input files to demonstrate prototype
│   └── data_sample.pdf                               # Data sample for high fidelity prototype
├── docs                                              # Documentation files
│   ├── personas                                      # User personas
│   │   ├── persona_1.pdf                             # Alice Baker persona
│   │   ├── persona_2.pdf                             # Ann Williams persona
│   │   ├── persona_3.pdf                             # Lila Hernandez persona
│   │   ├── persona_4.pdf                             # John McKenzie persona
│   │   ├── persona_5.pdf                             # Macos Franco persona
│   │   ├── persona_6.pdf                             # John Smith persona
│   │   └── process.pdf                               # Process followed for persona creation
│   ├── presentation.pdf                              # Presentation slides
│   └── requirements.pdf                              # Includes the project background, requirement elicitation, motivational model, user stories, mood board, user acceptance and the traceability matrix
├── prototypes
│   ├── high fidelity                                 # Screens, mockups, etc.
│   │   ├── src                                       # Exported figma files
│   │   │   ├── CH-Koala High Fidelity prototype.fig  # Figma source file
│   │   │   └── CH-Koala High Fidelity prototype.pdf  # High fidelity prototype screens export
│   │   └── high-fidelity-prototype.pdf               # High fidelity prototype page screens (with interactions)
│   └── low fidelity                                  # Screens, source files, etc.
│       ├── coverage                                  # Capabilities displayed in lofi prototype
│       │   ├── user-story-1.1.pdf                    # User story 1.1 in prototype
│       │   ├── user-story-2.1.pdf                    # User story 2.1 in prototype
│       │   ├── user-story-2.2.pdf                    # User story 2.2 in prototype
│       │   ├── user-story-4.1.pdf                    # User story 4.1 in prototype
│       │   └── user-story-4.2.pdf                    # User story 4.2 in prototype
│       └── low-fidelity-prototype.pdf                # Low fidelity prototype screens
├── tests                                             # User/system tests
│   └── usability_test.pdf                            # Usability test scenarios, feedback and action points
├── ui                                                # Graphical elements (used in prototypes)
│   ├── check-complete.png                            # Green check circle PNG
│   ├── check-complete.svg                            # Green check circle SVG
│   ├── check-empty.png                               # Empty check circle PNG
│   ├── check-empty.svg                               # Empty check circle SVG
│   ├── check-incomplete.png                          # Grey check circle PNG
│   ├── check-incomplete.svg                          # Grey check circle SVG
│   └── logo.png                                      # Capital Guardians Logo PNG
└── README.md
```

## Changelog

### [v1.0.0](https://github.com/SWEN90009-2023/CH-Koala/compare/26b87332d714c6d12922705f10902446b2773cc9...main) - 2023-06-06

#### Added

- Presentation slides in docs/presentation.pdf

### [v0.4.0](https://github.com/SWEN90009-2023/CH-Koala/compare/4ebf8e8f1ef103c2b62a34797de089791353d6f2...26b87332d714c6d12922705f10902446b2773cc9) - 2023-05-30

#### Added

- Acceptance Criteria, Acceptance Tests, Mood board and Traceability Matrix in docs/requirements.pdf
- High Fidelity Prototype in prototypes/high fidelity/high-fidelity-prototype.pdf
- Data Sample in data samples/data_sample.pdf
- Usability Test in tests/usability_test.pdf
- Graphical Elements in ui/

#### Changed

- moved into docs/requirements.pdf:
  - do-be-feel_list.pdf
  - goal_model.pdf
  - project_background.pdf
  - requirements_eliciation.pdf
  - user_stories.pdf
  - user_story_map.pdf
- added client and supervisor information to README.md

### [v0.3.0](https://github.com/SWEN90009-2023/CH-Koala/compare/2a85b6e7591c3a697822263dce81042dcd2f5b4d...4ebf8e8f1ef103c2b62a34797de089791353d6f2) - 2023-04-28

#### Added

- User Stories, User Story Map and Low Fidelity Prototype

#### Changed

- updated docs to better fit client requirements:
  - do-be-feel_list.pdf
  - goal_model.pdf

### [v0.2.0](https://github.com/SWEN90009-2023/CH-Koala/compare/759552a137c036409f5a51d68dbbd7c500ec1f08...2a85b6e7591c3a697822263dce81042dcd2f5b4d) - 2023-04-12

#### Added

- Do/be/Feel List, Goal Model and Personas

#### Changed

- renamed docs:
  - background.pdf to project_background.pdf
  - elicitation.pdf to requirement_elicitation.pdf

### [v0.1.0](https://github.com/SWEN90009-2023/CH-Koala/compare/d6fba4d31ded932755e4563850bfa586a81236b4...759552a137c036409f5a51d68dbbd7c500ec1f08) - 2023-03-20

#### Added

- Project background and elicitation documents

#### Changed

- Added project description to README.md

### [v0.0.1](https://github.com/SWEN90009-2023/CH-Koala/compare/339819185988b4c38369cae743fc4dbf62bdff2e...d6fba4d31ded932755e4563850bfa586a81236b4) - 2023-03-16

#### Added

- Project repository structure
