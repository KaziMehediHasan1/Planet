const Question = () => {
  return (
    <section className=" mt-16 text-gray-800 p-10 container  mx-auto">
      <div className="max-w-screen-lg mx-auto px-4 py-8  md:p-8 font-uiFont">
        <h2 className="text-2xl font-semibold sm:text-4xl pb-4 text-center">
          Frequently Asked Questions (FAQs) - Planet Newspaper
        </h2>
        <p className="mt-4 mb-8 text-gray-600 text-center">
          If you have any other updates or need help implementing this on your
          site, let me know!
        </p>
        <div className="space-y-4">
          <details className="w-full border-2 rounded-lg ">
            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-600">
              How can I subscribe to Planet to access premium content?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
              You can subscribe to Planet by clicking on the "Subscription" link
              in the navigation bar. Choose your preferred subscription plan,
              complete the payment process, and enjoy unlimited access to our
              premium articles.
            </p>
          </details>
          <details className="w-full border-2 rounded-lg" open="">
            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-600">
              How do I submit an article to be published on Planet?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
              To submit an article, you must first log in to your account. Then,
              navigate to the "Add Articles" section in your dashboard. Fill in
              the required fields, including the title, content, and any
              relevant tags or categories, and submit your article for review by
              our editorial team.
            </p>
          </details>
          <details className="w-full border-2 rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-600">
              Can I access Planet articles offline?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600">
              Yes, you can save articles for offline reading. Simply click on
              the "Save for Offline" button at the bottom of any article, and it
              will be available in your saved articles section, accessible even
              when you are not connected to the internet.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Question;
