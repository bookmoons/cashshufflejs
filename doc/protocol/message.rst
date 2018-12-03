Message
-------

A run has minimum 3 shufflers. The protocol defines a well known shuffle order,
so each shuffler is one of:

* First. Here called F.
* Inner. Not first or last. Here called I.
* Last. Here called L.

A session has 5 main phases. Each phase defines a single message. Some subset
of shufflers (potentially all) send an instance of the message in each phase.
The messages sent by each shuffler are:

=  =  =
F  I  L
=  =  =
1  1  1
2  2  \
\  \  3
4  4  4
5  5  5
=  =  =

Message 1
^^^^^^^^^

Reveals the encryption public key of the sender.

Packaged into a `Packets` for transfer:

* ``packet`` - Unary list of single signed packet.

A single `Signed` contains the data:

* ``signature`` - Packet signature by sender.
* ``packet``

    * ``session`` - Session identifier.
    * ``number`` - Sender pool number.
    * ``from_key``

        * ``key`` - Sender signing public key.

    * ``phase`` - Phase 1 identifier.
    * ``message``

        * ``key``

            * ``key`` - Sender encryption public key.
