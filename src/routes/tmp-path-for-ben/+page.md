# Forge has got my goat

How new formal method advancements lower the burden of learning and using software verification tools.

Forge is a hot new lightweight model checker built for pedagogy and ease of use.
In this post, I describe Forge and its novel language modes.
I pose a fun puzzle and solve it using two of Forge's language modes.
Finally, I contrast the two solutions using the diffrent expressive constructs afforded by each mode.

## The tool:


For the uninitiated, model checking is a method for guaranteeing particular properties that will always hold for some system (usually software or hardware).
The program specification, written by users, ensures the impossibility of undesirable events (e.g., the system may not leak user secrets).
A model checker takes this specification and feeds it to an [SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) solver.
The solver then proves that either the undesirable events cannot occur or there is a bug.
If satisfiable instances exist, the model checker enumerates every possible instance.
Depending on how a model is constructed, this means that if a bug exists, the checker will find every possible input that allows the buggy behavior.
In our case, once we write the constraints of the puzzle, the model checker will find every possible solution to our puzzle.

The Forge model checker is unique because it is built for real-world deployment and formal methods pedagogy.
It is used as part of the curriculum for software verification courses at Brown University and the University of Utah.

Since Forge is a tool built with pedagogy in mind, it must be easy for beginners to learn but have enough expressive power to remain helpful for more advanced real-world use.
Forge achieves this by having three user modes: Froglet, Relational Forge, and Temporal Forge.

* **Froglet:** the simplest mode, providing logical quantifiers (e.g., `some` and `all`) and little else
* **Relational Forge:** allows all valid Froglet and adds relational operators (e.g., transitive and reflexive closure)
* **Temporal Forge:** builds on the two previous modes by allowing [LTL](https://en.wikipedia.org/wiki/Linear_temporal_logic) operators to express models in the temporal domain

Although Froglet seems to be expressively poorer than Temporal Forge, anything that can be expressed in Temporal Forge can also be expressed in Froglet.
It may just require a bit of patience to build up these more complicated structures from a simpler initial system.
This is somewhat reminiscent of the notion of Turing Completeness as it relates to traditional programming languages (C can express anything Python can, but it may not be fun to write).

What follows will be an in-depth comparison between the simplest mode, Froglet, and the most complex mode, Temporal Forge.

## The puzzle:

Instead of modeling a large-scale software system, I want to keep things simple, so I'll use a fun kids' puzzle: Goats and Wolves.
The puzzle takes several steps to solve, meaning that Temporal Forge's extra operators will be handy (but aren't strictly necessary).
This should tease out some notable differences between the two language modes.
The puzzle is as follows:

Three goats and three wolves want to cross a river. They have one boat, which can hold up to two animals.
* Initially, all 6 animals and the boat are on the near side of the river.
* At the end, all 6 animals and the boat must be on the far side of the river.
    * In each step, the boat must carry 1 or 2 animals across the river.
    * The boat must move during each step.
    * The boat cannot move with zero animals inside.
* The wolves will eat the goats only if the wolves outnumber the goats.
    * All 6 animals must survive.

Here is a vizuilation (created in Forge) of one possible solution to this problem.

![Solution to Goat-Wolf Problem](goat-wolf-solution.png)

## A quick diff

I wrote idiomatic models for the Goat-Wolf problem in Froglet and Temporal Forge.
I diff'ed the two files on my computer, and two clear differences popped out:

1. In Froglet, the user must manage state explicitly, but Temporal Forge manages state implicitly
2. Froglet must 'explain' how time works to the solver

In regards to the first point, here are the relevant code snippets from each language and their signifigance:

```
#lang forge/froglet

abstract sig Animal {}

sig State {
    next: lone State,
    shore: pfunc Animal -> Position,
    boat: one Position
}
```

To handle state in Froglet, we declare a signature called `State`.
The `shore` field tracks the position of our animals by creating a mapping from `Animal` to `Position`.
The last field, `boat`, stores the position of the boat.
The first field, `next`, may point to our next state (the `lone` keyword means at most one).
This creates a 'linked list' of `State` signature's that track the positions of our entities over time.

This is in stark contrast to the implicit expression of states in Temporal Forge:

```
#lang forge/temporal

abstract sig Animal { var p: one Position }
```

Temporal Forge tracks state implicitly, hiding its internal representation from the user.
Because of this, Temporal Forge also allows its signatures to mark their fields as `var`.
Compared to Froglet's always static fields a `var` field denotes that the field's value may change across states.

---

The second difference I observed about 'explaining' time to the model checker:

```
#lang forge/froglet

pred TransitionStates {
    some init, final: State {
        initState[init]
        finalState[final]

        no s: State { s.next = init }
        no s: State { final.next = s }

        reachable[final, init, next]

        all pre: State | all post: pre.next { canTransition[pre, post] }
}
```

Froglet must use the `TransitionStates` predicate to constrain how the solver handles the time signature (Time must be linear; time must have a definite beginning and a definite end).
In line 4 of the code snippet above, we declare that there must exist some pair of states, called `init` and `final`, which must satisfy the following conditions.
The `init` state must follow the `initState` predicate.
`initState` isn't particularly interesting. It just states that the boat and all of the animals must begin on the near shore (as per the problem definition).
Dido, for the `final` state, the animals and the boat must end up on the far side of the river.

Line 8 declares that no state may precede the initial state.
Line 9 is similar by specifying that no state may follow the final state.
On line 11, we use a special reachability relation created just for Froglet. Here, it defines that starting at `init` and following on to the next state, we must eventually reach `final`.

The very last item in the `TransitionStates` predicate looks intimidating, so I'll break it down.
The last line states that for every state, 'pre', and for every possible state, 'post' that could follow 'pre', these two states must obey the `canTransition` predicate.
The `canTransition` predicate encodes parts of the problem relating to state transitions.
Such as: "In each step, the boat must carry 1 or 2 animals across the river." or "The boat must move during each step." etc.
In much simpler terms, line 13 says, "Each transition between timesteps must follow the rules laid out in `canTransition`."

Compare this to Temporal Forge's timestep management:

```
#lang forge/temporal

{
  initState
  always { canTransition }
  eventually finalState
}
```

Temporal Forge has particular constructs for handling these events directly.
These constructs make it intuitive to see that the first state must follow the rules of `initState`.
During state transition, the rules of `canTransition` must always be applied.
Eventually, the model must end in accordance with the `finalState` predicate.

## Conclusion

If Temporal Forge has all this expressive power, why bother with the less expressive modes?
I see two compelling reasons for a simpler language.

1. Many modeling problems don't require a time domain to be expressed
2. Simpler systems are a better way to teach students who have no prior experience with formal methods

## More resources

For those that find themselves intrested in learning more about Forge.

* [code for these models](TODO add link)
* [Forge website](https://forge-fm.org/)
* [Forge paper](https://cs.brown.edu/~tbn/publications/forge-oopsla24.pdf)
