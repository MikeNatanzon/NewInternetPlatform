# A NEW INTERNET PLATFORM

We are building an open source, digital currency-based web platform that will help people evaluate the credibility of all online content (making people better informed about the world around them and also help them make better decisions regarding health, finance, science, nutrition and so on), promote civil discourse online and reduce polarization in society, improve how scientific and medical publication is done, and allow content creators make money by creating high quality content. This platform promises to eliminate ads, trolls, and clickbait. See how the platform works here: https://youtu.be/fWbqsDp1OoI

## Current Development Progress
**[STAGE 0] [Prototype]** Develop an interface where the user can create a personal Username & Profile on the Platform (at this stage the profile can be very basic)

**[STAGE 1] [Prototype]** Based on User input/request, the system will extract all the text from an external webpage and store the text data on the New Internet Platform database.

- **[1.a]** The text should have a timestamp with the date/time it was extracted.

- **[1.b]** The extracted text should have associated with it the original webpage URL.

- **[1.c]** The extracted text should have associated with it the Username who made the request.

- **[1.d]** The system should extract the name of the author who wrote the article (since this may be more difficult to achieve, initially the system can prompt the User to input that data field).

**[STAGE 2] [Prototype]** User/Author Profile:

- **[2.a]** Each User on the Platform should have a Credibility Score and Performance Score associated with his or her profile. The score will be based on the scores the User received on his or her posts and comments. Refer to Platform Illustration pdf (Post 2.pdf) for UI concept.

- **[2.b]** CS and PS should have 'Total' scores as well as general topic scores (such as 'Tech', 'Health' or 'Politics'), as per Illustration.

**[STAGE 3] [Prototype]** Allow Users to rate the relative values of various topics on the Platform (this stage is essential for the Performance Score to work properly). UI illustration to follow.

**[STAGE 4] [Prototype]** Allow Users to rate the Credibility, Performance and Influence Scores of external webpages/posts using by commenting on the post. UI illustration to follow


<img src="https://github.com/MikeNatanzon/NewInternetPlatform/blob/master/images/UserInterface.PNG">
User Interface Illustration for a Post

# Principles

Before I dive into the specifics of the Credibility Score (CS) and Performance Score (PS) algorithms as I see them, I’d like to make the point that I don’t claim to have the ultimate answer as to what the “best” Credibility algorithm should be. The algorithm will likely evolve and go through multiple iterations to achieve the desired outcome (and you will all be able to advance your own changes and improvements to the algorithm).

What I can say however is that the CS algorithm (and indeed the platform as a whole) must be based on the following Principles: (1) Transparency, (2) Fairness, (3) Meaningfulness, and (4) Reliability.

Transparency means that every person can see the algorithm (which will be open source), understand how the algorithm applies to their Credibility Score. They will also be able to propose changes to improve the algorithm (ie. make it more transparent, fair, meaningful and reliable).

Fairness means that the algorithm is not biased against any individual or group. It treats every person (and every piece of content) in an evenhanded and consistent manner.

Meaningfulness means that the Credibility Score actually reflects how credible users are in reality in a way that is consistent with how an impartial observer would understand the situation.

Reliability means that people can trust the Platform to work as intended, and that no individual or group can hack or manipulate the algorithm to produce corrupt results.

I believe that as long as we follow these principles the algorithm will have the legitimacy and trust of the public.

# The Purpose of the Performance Score

With that said, let me explain why we need the Performance Score: the simple answer is that to determine the Credibility Score of a user (or author) we have to make sure that the numbers reflect something meaningful in reality.

Let’s take for example a Financial Analyst – if we don’t have a Performance Score (which measures the importance of the claims the person makes), the Financial Analyst can make 9 claims about the values of stocks in the past (e.g. “the stock price of Apple was $157 last December”) which are 100% accurate (Credibility Score = 10.0), and one claim about the value of a stock in the future (e.g. “the stock price of Netflix will be $7000 next year”). If the Financial Analyst is wrong his Credibility Score will decline to 8.0 
[(9 x 10) + (1 x -10)] / (9 + 1) = 8.0
   					          
{ [accurate claims] x [% accurate] + [inaccurate claims] x [% inaccurate] } / [# of claims] = [Credibility Score]
         
The equations above, of course, are simplified. Since each claim is measured individually, the algorithm for the calculation above will look something like this:

{ Sum ([claim] x [% accuracy]) } / [# of claims] = [Credibility Score]
                   
If our credibility score was determined as described above, that would completely defeat the purpose of the Credibility Score and allow anyone manipulate his/her Credibility Score by making irrelevant (but accurate) claims to offset relevant (but inaccurate claims).

The purpose of the Performance Score, therefore, is to make the Credibility Score meaningful (to give the proper “weight” to each claim). Accurate claims about the values of stocks in the past are valued a lot less by the general public then accurate predictions of future stock prices. Let’s say the public values accurate claims about the values of stocks in the past at 0.04 PS (Performance Score), while accurate predictions of future stock prices are valued by the public at 20 PS. Then the person’s Credibility Score would be:

 { [(9 x 0.04) x 10] + [(1 x 20) x -10] } / [(9 x 0.04) + (1 x 20)] = -9.65
       
{ [accurate claims]x[weight of claims]x[% accurate] + [inaccurate claims]x[weight of claims]x[% inaccurate] } / { Sum ([claim] x [weight of claim]) } = [Credibility Score]
        
This equation is more accurately given by the algorithm:

 { Sum ([claim] x [weight of claim] x [% accuracy]) } / { Sum ([claim] x [weight of claim]) } = [Credibility Score]
                
With the help of the Performance Score, an 8.0 “credibility score” (which doesn’t reflect much in reality) is reduced to a -9.65 Credibility Score (which gives a more accurate representation of the person’s track record).

<img src="https://github.com/MikeNatanzon/NewInternetPlatform/blob/master/images/CredVsImportance.PNG" width=500>

Consider the graph above – what we want is for the Credibility Score to give high rating to someone who posts content of high credibility and high importance, and punish someone who posts fraudulent or misleading information about high importance subjects. Similarly, we want the reward/punishment to be proportional both to the importance of the subject matter and to the level of accuracy of the post. 

As stated above, the Credibility Score (weighted by the Performance Score) achieves this goal.

# How is the Performance Score measured?

To fully understand why the Performance Score is measured the way it does I’ll need to explain the Economic Model that the New Internet Platform is based on. However, for now it is sufficient to describe how the Performance Score is measured.

Let’s start from the broad view: The total number of Performance Score credits on the Platform is always equal to the number of posts. The total number of credits represents 100% of the value (importance) of all posts on the Platform. Logically, the average rating of a post on the Platform is 1 PS (ie. dividing the total number of Performance Score credits by the total number of posts should give us exactly 1). By normalizing the average Performance Score of a post to 1 PS we get a better sense of how much a post should be worth. Similarly, if a certain user has 150,000 posts, but only has 50,000 PS, we can tell that the user has below average influence.

Normalizing the Performance Score to the average post also allows people to more easily determine the appropriate exchange rate between W1 (Webcoin) and other currencies, since people will be able to see the “average” post (a post with 1 PS) and determine how much the post should be worth in dollars.

Every user has the ability to influence the relative importance of content topics/categories on the Platform. The level of influence each user has is dependent on the user’s overall credibility (which is given by his or her CS x PS score – aka their Webcoins).
For example, suppose the following:

User 1 (W50,000) values Health at 30%, Technology at 20%, Politics at 15% and all other at 35%
User 2 (W10,000) values Health at 10%, Technology at 20%, Politics at 2% and all other at 68%
User 3 (W1,000) values Health at 5%, Technology at 75%, Politics at 5% and all other at 15%

(Of course I’m simplifying here by assuming these are the only users on the Platform, and that Health, Technology, and Politics are the main topics. In reality we can have countless users and countless topics, but the process will work just the same)

The relative importance of Health would be:
(0.30 x 50,000 + 0.10 x 10,000 + 0.05 x 1,000) / (50,000 + 10,000 + 1,000) = 26.31%

The relative importance of Technology would be:
(0.20 x 50,000 + 0.20 x 10,000 + 0.75 x 1,000) / (50,000 + 10,000 + 1,000) = 20.90%

The relative importance of Politics would be:
(0.15 x 50,000 + 0.02 x 10,000 + 0.05 x 1,000) / (50,000 + 10,000 + 1,000) = 12.70%

The relative importance of all other topics would be:
(0.35 x 50,000 + 0.68 x 10,000 + 0.15 x 1,000) / (50,000 + 10,000 + 1,000) = 40.08%

The algorithm here is:

 { Sum ([% value of Topic by User] x [CS x PS of User]) }  / Sum ([CS x PS of User]) = [Overall value of Topic]
         	       
Now, each topic can be further subdivided into subtopics, and people can rate the subtopic’s relative importance. Then those subtopics can be further subdivided and their subcategories can be further rated based on their relative importance.

So for example, you can have the topic of Health > Diseases > Diabetes > Possible Cures > etc.

If Diseases have a relative importance of 30.2% within the topic of Health (which in the example above has 20.90% importance on the Platform overall), then the relative importance of Diseases is 6.31% overall (0.2090 x 0.302 = 0.0631). 

If there are currently a total of 1 million posts on the Platform, the Performance Score credits for the subtopic of Diseases will have a total of 63,111.8 PS in this example.

# Maximizing value

Each user on the Platform will have a certain Credibility Score and a certain Performance Score based on his/her posts. CS x PS = Webcoins (W). Now, it seems logical that every user would want to maximize the number of his/her Webcoins. What really matters, however, is not the number of Webcoins but what these Webcoins are worth.

If you had a choice between having 1,000 Webcoins at the exchange rate of W1 : $0.05 (ie. W1,000 x $0.05/ W1 = $50), or 200 Webcoins at the exchange rate of W1 : $2.00 (ie. W200 x $2/ W1 = $400), obviously you’d prefer to have the latter (even though you’d only have 1/5 the number of Webcoins).

Thus, it’s clear that while it’s important to try and maximize the Credibility Score and Performance Score, it is even more important to make sure that the Platform as a whole is valuable to the general public. 

Consider for example what happens if a particular user posts mostly about film history or some other esoteric subject. If that user wanted to increase his Performance Score she’d rate the topic the user posts the most about at 100% value and everything else at 0%. However, that strategy is unlikely to maximize the user’s return. Since what matters is the exchange value of Webcoins (in dollars or other currencies), the user would want to make sure Webcoins are as valuable as possible. To do so the user would consider giving the most appropriate rating to different topics based on how the user perceives their overall contribution to the Platform (and to society) as a whole. Thus, a user that mostly posts about film history may rate Health at 30% and Art History at 5%, and still receive a much higher return on her (smaller) Performance Score, by helping the Platform become fantastically more valuable.

# How content is rated

Any post receives 3 types of scores:
1)	Performance Score
2)	Credibility Score
3)	Influence Distribution

## I. Performance Score

Whenever a user posts content, the user specifies what topic/subtopic (or subtopics) the post is related to, and rates the relative importance of the post within the subtopic(s). Other users can also specify what subtopic(s) the user’s post is related to and rate the relative importance of the post within the subtopic(s).

The PS of the post will then be based on the relative ranking of the post within each subtopic, multiplied by the percent that it is related to that subtopic, these then produce a combined PS score.

For example, a post on “The Influence of Policy on HIV Research” can be 43% in the “American Politics” subtopic, 51% in the “HIV” subtopic, 3% in the “History” subtopic, and 3% distributed among other subtopics. In this example the combined Performance Score make look something like this: 0.43 x 345 PS (from American Politics) + 0.51 x 1,023 PS (from HIV) + 0.03 x 32 PS (from History), and so on.

Again, users specify what topics/subtopics any post belongs to. The percentage distribution of any given post among different topics and subtopics is calculated based on the influence of the users who specify the subtopics (similar to the process I described before for how users determine the relative importance of the topics themselves to the Platform as a whole).

It’s important to note two things here. First, the author of the post gets to specify the subtopic and rate his or her own post just like everyone else. Second, it is still in the best interest of each user – including the author of the post – to try to be as fair and accurate as possible in specifying topics and rating posts. The reason for it is that if a user tries to manipulate the system by either specifying topics for the purpose of either minimizing or maximizing the PS of the post in question, other users can comment and rate that user’s rating. If that user is clearly trying to manipulate the post’s Performance Score, instead of giving a sensible and honest evaluation, that user’s Credibility Score and Performance Score will suffer as a result (which also means that the user’s influence on the Platform and on making future evaluations will diminish as well). Again, this concept applies both to the author and to other users.

## II. Credibility Score

The Credibility Score of each post is determined by breaking down the post into individual sentences, then assigning a Credibility Score (-10 to 10) and a relative importance value for each sentence in relation to the article as a whole (the relative importance values of all sentences in the post must add up to 100%).

The overall Credibility Score of the post is calculated by adding the CS of each sentence multiplied by the percentage of relative importance for that sentence. 

For example: in a post with 3 sentences, Sentence A has 7 CS and 10% importance. Sentence B has 10 CS and 50% importance. Sentence C has 0 CS and 40% importance. The post’s Credibility Score will be: 

(7 x 0.1)+(10 x 0.5)+(0 x 0.4) = 5.7 CS

Users will also be able to add labels to sentences so that the sentence’s credibility can be evaluated appropriately. For example, a sentence that is labeled as “sarcasm” or “joke” will be labeled differently than if the sentence was taken at face value.
Just as in the case of the Performance Score, the CS and relative importance value of each sentence will be calculated based on the influence of the users who make the determination. 

However, just because a user has high influence in the Platform as a whole, doesn’t mean that he or she should have a lot of influence on any given topic. For example, a nuclear scientist doesn’t necessarily know much about Ancient Rome, so even if her influence on the Platform overall is much greater than that of experts of Ancient Rome, it makes no sense for her to have an outsized influence on a post related to Ancient Rome. For that reason, the influence each user has on the Credibility Score of any particular post will be weighted based on the CS and PS the user has within those topics, and proportionally to topics that are closely related to the topic of the post. The “relatedness” of topics will be based on the percentage distribution of topics for posts within the particular topic.

For example, if a post is under the subtopic of Physics, then the system looks at all the posts in that subtopic and determines what other subtopics these posts are related to. It may find that 32% of the posts are also related to Chemistry, 60% are also related to Engineering, 15% are also related to Biology, 22% are also related to Education, and so on.

Then, if we consider a user who has an overall CS x PS of 60,000 on the Platform, that person may only have CS x PS of 1,000 from posts related to Physics, 3,200 from posts related to Engineering, 500 from posts related to Chemistry, and so on. If that person wants to rate the Credibility Score of a post on Physics, the user’s influence for that post will not be 60,000. Instead, it will be (1,000 x 1) + (3,200 x 0.60) + (500 x 0.32) etc.

Thus the Credibility Score for posts on the Platform will remain meaningful and rely on expert opinion.

A user will also be able to increase his influence by referencing other high credibility posts and providing evidence to support his or her CS rating of a sentence in the post.

Note here that, just as in the case of the Performance Score, both the author and other user can rate the Credibility Score of the post. Here too it is important to rate the score fairly and accurately, because doing otherwise may hurt the user’s own Credibility and Performance scores.

## III. Influence Distribution

One of the most innovative (yet somewhat counterintuitive) aspects of the New Internet Platform is that all content on the Platform is available for everyone to use and modify for free (with no ads, no paywalls, or restrictions of any kind), yet users get to make money from their content through the digital currency.

Since the Platform promotes the free flow of information, it is essential that people are rewarded according to their contribution, as well as given credit when others use and/or modify their work. For that reason, the Platform has an Influence Distribution rating, designed to distribute the CS x PS points for each post according to the sources that contributed to its creation.

For example, suppose a user writes a post that is mostly based on the ideas of other authors. In that case the Influence Distribution for the post may look something like this: 

•	Post (self): 15%

•	Source A: 35%

•	Source B: 5%

•	Source C: 2%

•	Source D: 12%

•	Source E: 21%

•	Source F: 10%

Thus, if for instance the CS x PS for the post is 2,000, the post itself will only get 300 points (2,000 x 0.15), while the rest of the Sources will be rewarded according to their contribution to the post.

Note that the source to be credited should be as specific as possible (for example, credit a specific post, or series of posts, from a user, rather than crediting the user herself). This way, if Source A got 35% of the points, these points can be further subsiding among the sources that Source A relies on, according to Source A's own Influence Distribution rating.

When every user on the Platform is comparable rewarded for his or her contribution, it means that the Platform works better and information flows more freely. What's even better, when users know they'll be rewarded for their work they also have an incentive to collaborate with others (and in more complex ways) on creating more enriched content that otherwise would not have been possible.

Also note that if CS x PS is negative (ie. If the Credibility Score of the post is negative) then only the post itself gets the negative points (ie. -500 x 0.15) while the other sources get 0 points. The reason the sources do not get penalized is that (1) it prevents abuse of the system by users who may post purposefully misleading posts in order to hurt other users' scores, (2) the Platform gives users the option to automatically “hide” posts with negative CS rating, which means that the effect of those posts is minimized on the Platform. Since the Platform effectively neutralizes trolls and others who try to manipulate the system, it seems unfair to penalize users for the content created by someone else.

The Influence Distribution rating mechanism will work similarly to the Credibility Score in that any user can specify the sources for a post and the proper distribution of points. Here too every user has the incentive to give a proper rating and not manipulate the system.
