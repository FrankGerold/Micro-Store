# Micro-Store
## To-do:
### Client:
- convert into Typescript
- Convert into next 9.3+ methods, e.g. getInitialProps -> getServerSideProps
- refactor login/logout pages with reusable form helper function
- ~~Set up Cookie middleware for requests in 9.4+~~ Forgot to view updated minikube ip with httpS in browser lol. cookies work again
- Set up purchase page to buy tix
### Auth
- Add NATS integration
### Tickets
- Connect to frontend
- Add NATS integrateion
### NATS
- Set up full config based on docs
- conenct to the various other services, with special channels for each
### Orders
- Set up, connect with tickets and client
- Integrate NATS
### Common
- Set up separate github repo that corresponds with Node published version
- Make it a true submodule here
- Possibly separate general NATS integration logic here for all the other services
