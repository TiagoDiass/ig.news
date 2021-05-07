import { query as q } from 'faunadb';
import { fauna } from 'services/fauna';
import { stripe } from 'services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  isCreateAction = false
) {
  // Buscar o user no FaunaDB pelo customerId do stripe
  const userRef = await fauna.query(
    q.Select('ref', q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)))
  );

  // obter dados da inscrição já que o stripe não manda tudo
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id, // poderia ser o parametro que recebemos tbm
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  };

  // Salvar os dados da subscription no FaunaDB
  if (isCreateAction) {
    await fauna.query(q.Create(q.Collection('subscriptions'), { data: subscriptionData }));
  } else {
    await fauna.query(
      q.Replace(q.Select('ref', q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))), {
        data: subscriptionData,
      })
    );
  }
}
